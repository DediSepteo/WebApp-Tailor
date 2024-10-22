import ViewAll from "../components/viewAll";

const ViewAllProduct = () => {
    const headers = { "Name": "name", "Description": "description", "Price": "price", "Organization": "org_name" }
    return (
        <ViewAll category="Product" type="Corporate" headers={headers}></ViewAll>
    )
}

export default ViewAllProduct;