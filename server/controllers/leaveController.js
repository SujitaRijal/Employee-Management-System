import Employee from "../models/employeeModel.js";
import Leave from "../models/leaveModel.js";
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Leave add server error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find leaves by employeeId
    let leaves = await Leave.find({ employeeId: id });

    // If no leaves found, try to find employee by userId
    if (leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        leaves = await Leave.find({ employeeId: employee._id });
      }
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Leave add server error" });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name , profileImage",
        },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Leave add server error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Leave add server error" });
  }
};
export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
