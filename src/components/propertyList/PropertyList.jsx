import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");

  const images = [
    "https://ebents.com/incubandoexitos/wp-content/uploads/2018/02/elegir-el-lugar-ideal-negocio.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDmH8pxxmlEPgKBGY4q-JuDzCXmy6MGTlTw&s",

  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                 
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;