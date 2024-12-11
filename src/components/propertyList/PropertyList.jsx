import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");
<<<<<<< HEAD

  const images = [
    "https://ebents.com/incubandoexitos/wp-content/uploads/2018/02/elegir-el-lugar-ideal-negocio.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDmH8pxxmlEPgKBGY4q-JuDzCXmy6MGTlTw&s",

  ];
=======
>>>>>>> 47cc3b354b737b983352de487760a7e602402269
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="pListItem">
            <img
              src={'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o='}
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Lugares</h1>
            </div>
          </div>
          <div className="pListItem">
            <img
              src={'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg'}
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