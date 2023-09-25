import "./MyReports.css";
import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function MyReports({ reports, userInfo }) {
  let rowNum = 1;
  return (
    <div className="myReportsDiv">
      <Table border="1">
        <TableHead>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{rowNum++}</TableCell>
                <TableCell>{report.subject}</TableCell>
                <TableCell>{report.level}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>{report.score}</TableCell>
                <TableCell>{moment(report.date).format('DD MMM YYYY')}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default MyReports;
