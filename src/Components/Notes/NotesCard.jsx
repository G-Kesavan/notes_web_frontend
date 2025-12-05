import moment from "moment/moment";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NotesCard = ({
  id,
  tital,
  date,
  content,
  tags,
  isPinned,
  onEditOpen,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="notes border-blue-100 border rounded-lg p-4 bg-white hover:shadow-xl transition-all ease-in-outz">
      <div className="flex justify-between">
        <div>
          <h6 className="tital">{tital}</h6>
          <span className="noteDate text-blue-950/70">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn cursor-pointer ${
            isPinned ? "text-blue-950" : "text-blue-300"
          }`}
          onClick={() => onPinNote(id)}
        />
      </div>

      <p>{content?.slice(0, 60)}</p>
      <div className="flex justify-between">
        <div className="text-blue-950/70">
          {tags.map((tag, index) => (
            <span key={index}>{` #${tag}`}</span>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <MdCreate onClick={() => onEditOpen(id)} className="cursor-pointer" />
          <MdDelete onClick={() => onDelete(id)} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
