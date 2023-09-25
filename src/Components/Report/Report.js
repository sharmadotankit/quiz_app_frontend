import './Report.css';

const Report = ({ score, testInfo, user }) => {
  return (
    <div className="reportDiv">
      <h1>Report</h1>
      <hr />
      <p>Name : {user.name}</p>
      <p>Subject : {testInfo.subject}</p>
      <p>Level : {testInfo.level}</p>
      <p>Percentage : {score + "%"}</p>
      <p>Status : {score > 50 ? "Passed" : "Failed"}</p>
    </div>
  );
}
export default Report;