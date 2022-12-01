import Pagination from "@mui/material/Pagination";

const PaginationList = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (e, p) => {
    console.log(e, p);
    paginate(p);
  };

  return (
    <>
      <Pagination
        count={pageNumbers.length}
        color="primary"
        onChange={handleChange}
      />
    </>
  );
};

export default PaginationList;
