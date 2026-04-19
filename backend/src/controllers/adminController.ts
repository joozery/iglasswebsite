import { Request, Response } from 'express';
import Admin from '../models/Admin';

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    res.json(admins);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const updateData = { ...req.body };
    // If password is empty string, don't update it
    if (!updateData.password || updateData.password === '') {
      delete updateData.password;
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedAdmin);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin && admin.password && admin.password === password) {
      // Update status to Active Now
      admin.status = 'Active Now';
      await admin.save();

      res.json({ 
        message: 'Login successful', 
        admin: { id: admin._id, name: admin.name, role: admin.role, status: admin.status } 
      });
    } else {
      res.status(401).json({ message: 'รหัสผ่านหรือชื่อผู้ใช้งานไม่ถูกต้อง' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.status = 'Offline';
      await admin.save();
      res.json({ message: 'Logged out successfully' });
    } else {
      res.status(404).json({ message: 'ไม่พบผู้ใช้งานนี้ในระบบ' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการ Logout: ' + error.message });
  }
};


