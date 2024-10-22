import ViewAll from "../components/viewAll";

const ViewAllOrg = () => {
    const headers = { "Name": "name", "Email": "email", "Industry": "industry", "No. of Products": "productNo" }
    return (
        <ViewAll category="Organization" type="Corporate" headers={headers}></ViewAll>
    )
}

export default ViewAllOrg;