import Excel from "exceljs";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "./fbase";

const applyToXlsx = async () => {
  try {
    const workbook = new Excel.Workbook();
    workbook.creator = "URBUR";
    workbook.lastModifiedBy = "URBUR";
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.addWorksheet("2023 명부");
    const sheetOne = workbook.getWorksheet("2023 명부");

    sheetOne.columns = [
      { header: "이름", key: "name", width: 10 },
      { header: "학번", key: "studentId", width: 20 },
      { header: "연락처", key: "phoneNumber", width: 20 },
      { header: "회비납부", key: "paid", width: 10 },
    ];
    const q = query(
      collection(dbService, "2023registered"),
      orderBy("name", "asc")
    );
    const registeredData = await getDocs(q);
    const arr = registeredData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    arr.map((item, index) => {
      sheetOne.addRow(item);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `2023_어리버리_명부.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.error(error);
  }
};
export default applyToXlsx;
