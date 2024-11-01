import ViewAll from "../components/viewAll";

const ViewAllOrg = ({ type }) => {
    const deleteLink = "http://localhost:3000/api/org/"
    return (
        <ViewAll category="Organization" type={type}
            deleteLink={deleteLink} deleteTitle={"Deleting organization"}
            deleteText={"Are you sure you want to delete this organization?"}></ViewAll>
    )
}

export default ViewAllOrg;