import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.bunnoestudio.com/wp-content/uploads/2021/07/que-debe-tener-una-sala-de-conferencias.jpg"
              alt="Sala de conferencias"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Sala de conferencias</h1>
           
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cdn.prod.website-files.com/5da0a1a1718dbe0c6b38d860/63d1c0babcec7178e7d3a236_WhatsApp%20Image%202023-01-25%20at%205.26.40%20PM%20(1).jpeg"
              alt="Sala de juntas"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Sala de juntas</h1>
              
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcD-6Fmausv1Bb6e7JjoxgwJEXdf9V27SQHA&s"
              alt="Sala de videoconferencia"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Sala de videoconferencia</h1>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
