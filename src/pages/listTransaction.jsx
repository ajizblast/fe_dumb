import { IoMdArrowDropdownCircle } from "react-icons/io";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import moment from "moment";

const ListTransaction = () => {
  const [state] = useContext(UserContext);
  const { data: transaction } = useQuery("transactionDetailCache", async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });
  console.log("sndaj", transaction);

  const dateConvert = (date) => {
    const startDate = moment().format("YYYY-MM-DD");
    const endDate = moment(date);
    const duration = moment.duration(endDate.diff(startDate));
    console.log(startDate, endDate);
    const days = duration.asDays();

    return days.toFixed();
  };
  return (
    <>
      <div className="px-20 bg-black py-10">
        <div className="container mx-auto py-20 h-[100vh]">
          <h2 className="font-bold text-white text-lg mb-5">
            Incoming Transaction
          </h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((trans, id) => (
                <tr key={id}>
                  <td>{trans.id}</td>
                  <td>{trans.user.fullname}</td>
                  <td>
                    {/* {new Date(trans.due_date).getTime() -
                      new Date().getTime() * 1000 * 60 * 60 * 24} */}
                    {dateConvert(trans.user.due_date) + " " + "hari"}
                  </td>
                  <td>{trans.user.status_user}</td>
                  <td>{trans.status_payment}</td>
                  <td className="relative">
                    <button className="pl-3">
                      <IoMdArrowDropdownCircle className="text-2xl text-sky-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListTransaction;
