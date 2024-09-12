import {  PlusOutlined } from "@ant-design/icons";

const IconButton = ({ title, onClick, icon }) => {
    let Icon = icon || PlusOutlined
  return (
    <div className="btn-container" style={{ paddingRight: 10 }} onClick={onClick}>
      <div className="icon-wrapper">
        <Icon />
      </div>
      <span className="px-1"> {title} </span>
    </div>
  );
};

export default IconButton;
