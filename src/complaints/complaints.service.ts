import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint } from './complaints.schema';
import { Model } from 'mongoose';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
  ) {}

  async getComplaintsGroupedByStatus(userId: string) {
    const groupedComplaints = await this.complaintModel.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: '$status', complaints: { $push: '$$ROOT' } } },
      { $project: { _id: 0, status: '$_id', complaints: 1 } },
    ]);
    const result = {};
    groupedComplaints.forEach((group) => {
      result[group.status] = group.complaints;
    });
    return result;
  }

  async submitComplaint(
    userId: string,
    title: string,
    body: string,
    complaintCategoryId: string,
  ): Promise<Complaint> {
    const complaintCountAggregate = await this.complaintModel
      .aggregate([
        { $match: { createdBy: userId } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ])
      .exec();

    const complaintCount =
      complaintCountAggregate.length > 0 ? complaintCountAggregate[0].count : 0;

    const complaintTitle = `${title}#${complaintCount + 1}`;

    const complaint = new this.complaintModel({
      createdBy: userId, // Assign the createdBy field with the user ID
      title: complaintTitle,
      body,
      complaintCategoryId,
      status: 'PENDING',
    });

    return await complaint.save();
  }

  async getMyComplaints(userId: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    return await this.complaintModel.find({ createdBy: userId }).skip(offset).limit(limit);
  }

  async getComplaintDetails(complaintId: string, userId: string) {
    const complaint = await this.complaintModel.findOne({
      _id: complaintId,
      createdBy: userId,
    });
    if (!complaint) {
      throw new NotFoundException(
        'Complaint not found or does not belong to the user.',
      );
    }
    return complaint;
  }

  async deleteComplaint(complaintId: string, userId: string) {
    const result = await this.complaintModel.deleteOne({
      _id: complaintId,
      createdBy: userId,
    });
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'Complaint not found or does not belong to the user.',
      );
    }
  }
}

