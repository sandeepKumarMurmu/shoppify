import { useSelector } from "react-redux";

export const ViewCard = () => {
  const { image } = useSelector((state) => state.ImageReducer);

  return (
    <>
      <div className="view_imageContainer">
        <img className="Image" src={image} alt="" />
      </div>
    </>
  );
};
