// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export const CustomizedBadges = () => {
  return (
    <button type="button" className="btn btn-primary position-relative">
      cart
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        99+
      </span>
    </button>
  );
};
