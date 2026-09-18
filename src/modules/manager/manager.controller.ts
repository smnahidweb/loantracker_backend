import { Request, Response } from "express";
import { managerService } from "./manager.service";


const getPendingStaffs = async (req: Request, res: Response) => {
  try {
    const pendingStaffs = await managerService.getPendingStaffs();
    return res.status(200).json({
      success: true,
      message: "Pending staff list fetched successfully",
      data: pendingStaffs,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch pending staff list",
    });
  }
};

const assignManagerRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role, branch } = req.body;

    
    const updatedUser = await managerService.assignManagerRole(userId as string,{role,branch});

    return res.status(200).json({
      success: true,
      message: "ম্যানেজার হিসেবে সফলভাবে রোল আপডেট করা হয়েছে",
      data: updatedUser,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "রোল আপডেট করতে সমস্যা হয়েছে",
    });
  }
};



const getAllManagers = async (req: Request, res: Response) => {
  try {
    const managers = await managerService.getAllManagers();
    return res.status(200).json({
      success: true,
      message: "Manager list fetched successfully",
      data: managers,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch managers",
    });
  }
};


// demoteManager

const demoteManager = async (req:Request,res:Response)=>{


  try{

    const {userId} = req.params;

    const result = await managerService.demoteManager(userId as string);

    return res.status(200).json({
      success:true,
      message:"ম্যানেজারকে সফলভাবে ডিমোট করা হয়েছে",
      data:result
    })

  }

  catch(error:any){
    return res.status(500).json({
      success:false,
      message: error.message ||  "Failed to demoteManager" 
    })
  }
}

// updateManagerDetails

const updateManagerDetails = async(req:Request,res:Response)=>{

try{

  const {userId} = req.params;
  const payload = req.body;

  const result = await managerService.updateManagerDetails(userId as string,payload);
 
  return res.status(200).json({
    success:true,
    message:"successfully updated manager informations",
    data:result
  })


}
catch(error:any){
 return res.status(500).json({
    success:false,
    message:error.message || "failed to updated manager details"
  })
}


}

// get specific manager profile by userId
const getManagerProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const manager = await managerService.getManagerProfile(userId as string);

    return res.status(200).json({
      success: true,
      message: "ম্যানেজারের প্রোফাইল তথ্য সফলভাবে পাওয়া গেছে",
      data: manager,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "প্রোফাইল লোড করতে সমস্যা হয়েছে",
    });
  }
};


export const managerController = {
  getPendingStaffs,
  assignManagerRole,
  getAllManagers,
  demoteManager,
  updateManagerDetails,
  getManagerProfile,
};