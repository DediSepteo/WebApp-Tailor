import ViewAll from "../components/viewAll";

const ViewAllProduct = ({ type }) => {
    const deleteLink = "http://localhost:3000/api/product/"
    return (
        <ViewAll category="Product" type={type}
            deleteLink={deleteLink} deleteTitle={"Deleting Product"}
            deleteText={"Are you sure you want to delete this product?"}></ViewAll>
    )
}

export default ViewAllProduct;