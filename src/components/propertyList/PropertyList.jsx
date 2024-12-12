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
          <div className="pListItem">
            <img
              src={'https://ebents.com/incubandoexitos/wp-content/uploads/2018/02/elegir-el-lugar-ideal-negocio.jpg'}
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Lugares</h1>
            </div>
          </div>
          <div className="pListItem">
            <img
              src={'https://blog.jamar.com/wp-content/uploads/juego-de-sala-lana-01-1200x900.webp'}
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Salas</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;