import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComplaintCategory } from 'src/complaints-category/complaints-category.schema';
import { Complaint } from 'src/complaints/complaints.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
    @InjectModel(ComplaintCategory.name) private complaintCategoryModel: Model<ComplaintCategory>,
  ) {}

 
  async getAllComplaintCategories(){
    return await this.complaintCategoryModel.find();
  }

  async getComplaintCategoryById(categoryId: string) {
    const category = await this.complaintCategoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Complaint category not found');
    }
    return category;
  }

  async createComplaintCategory(name: string) {
    const category = new this.complaintCategoryModel({ name });
    return await category.save();
  }

  async updateComplaintCategory(categoryId: string, newName: string) {
    const category = await this.getComplaintCategoryById(categoryId);
    category.name = newName;
    return await category.save();
  }

  async deleteComplaintCategory(categoryId: string) {
    await this.getComplaintCategoryById(categoryId); 
    await this.complaintCategoryModel.findByIdAndDelete(categoryId);
  }

  
  async getAllComplaints() {
    return await this.complaintModel.find();
  }

  async getComplaintById(complaintId: string){
    const complaint = await this.complaintModel.findById(complaintId);
    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }
    return complaint;
  }

  async updateComplaintStatus(complaintId: string, newStatus: string){
    const complaint = await this.getComplaintById(complaintId);
    complaint.status = newStatus;
    return await complaint.save();
  }
}