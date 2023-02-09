export const StatusFilter = ({
  setSelectedCategory,
  selectedCategory,
  data,
}) => {
  const onGoingStatus = data.filter(
    (item) => item.status === "on going"
  ).length;
  const droppedStatus = data.filter((item) => item.status === "dropped").length;
  const completeStatus = data.filter(
    (item) => item.status === "complete"
  ).length;

  return (
    <>
      <p
        onClick={() => {
          setSelectedCategory();
        }}
        style={{
          cursor: "pointer",
          borderBottom: "3px solid white",
          fontWeight: !selectedCategory ? "600" : "normal",
        }}
      >
        All
      </p>
      <p
        className="container-statusON"
        onClick={() => {
          setSelectedCategory("on going");
        }}
        style={{
          fontWeight: selectedCategory === "on going" ? "600" : "normal",
        }}
      >
        {selectedCategory === "on going" ? (
          <i class="fa-solid fa-eye"></i>
        ) : (
          <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }}></i>
        )}
        On Going: <span>{onGoingStatus}</span>
      </p>
      <p
        className="container-statusDR"
        onClick={() => setSelectedCategory("dropped")}
        style={{
          fontWeight: selectedCategory === "dropped" ? "600" : "normal",
        }}
      >
        {selectedCategory === "dropped" ? (
          <i class="fa-solid fa-eye"></i>
        ) : (
          <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }}></i>
        )}
        Dropped: <span>{droppedStatus}</span>
      </p>
      <p
        className="container-statusCO"
        onClick={() => setSelectedCategory("complete")}
        style={{
          fontWeight: selectedCategory === "complete" ? "600" : "normal",
        }}
      >
        {selectedCategory === "complete" ? (
          <i class="fa-solid fa-eye"></i>
        ) : (
          <i class="fa-solid fa-eye-slash" style={{ opacity: "0.5" }}></i>
        )}
        Complete: <span>{completeStatus}</span>
      </p>
    </>
  );
};
