import { useState } from "react";
import { BooksTable } from "../components/BooksTable";
import { EditBooks } from "../components/EditBooks";

export const BooksDetails = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {showForm && <EditBooks setShowForm={setShowForm} />}
      <BooksTable setShowForm={setShowForm} />
    </div>
  );
};
