import Image from "next/image";

const EmployeeChart = ({ employeeChartData }) => {
  const styles = {
    column: "w-1/2 flex flex-col border-2 border-black",
    columnLabel:
      "font-sourceSerif font-bold text-2xl text-black m-0 text-center border-b-4 border-black pb-2 md:text-3xl lg:text-4xl",
  };

  return (
    <section className="m-0 mt-9 max-w-[1000px] mx-auto">
      <div className="flex justify-between m-0  mb-7 bg-white border-4 border-black shadow-2xl">
        <div className={styles.column}>
          <h2 className={styles.columnLabel}>Name</h2>
          {employeeChartData.map((employee, index) => {
            return (
              <p
                className="font-sourceSerif text-2xl m-0 my-auto border-b-2 border-black h-[100px] text-ellipsis text-center overflow-hidden whitespace-nowrap p-5 font-semibold md:text-3xl"
                key={index}
              >
                {employee.firstName + " " + employee.lastName}
              </p>
            );
          })}
        </div>
        <div className={styles.column}>
          <h2 className={styles.columnLabel}>Signature</h2>
          {employeeChartData.map((employee, index) => {
            return (
              <Image
                className="h-[100px] w-full p-3 border-b-2 border-black"
                src={employee.signature}
                alt="signature"
                key={index}
                width={40}
                height={40}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EmployeeChart;
