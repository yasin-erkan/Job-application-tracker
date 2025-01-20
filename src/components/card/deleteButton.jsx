import { FaTrashAlt } from "react-icons/fa";
import api from "./../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteJob } from "../../redux/slices/jobSlice";

const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!confirm("Are sure about deleting this application?")) return;
    api
      .delete(`/jobs/${id}`)
      .then(() => {
        dispatch(deleteJob(id));
        toast.success("Application removed from the list!");
      })
      .catch((err) => {
        toast.error("There should be a problem!");
      });
  };
  return (
    <button className="delete" onClick={handleDelete}>
      <FaTrashAlt />
    </button>
  );
};

export default DeleteButton;
