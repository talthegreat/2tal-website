import { type Play } from "./SongMix";

interface Props {
  data: Play;
}

function MusicCard({ data }: Props) {
  return (
    <div className="art-card music-card">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img className="m-1 music-img" src={data.cover} />
          </div>
          <div className="col-md-8 d-none d-md-block">
            {/* "card-body" v */}
            <div className="py-3">
              <h6 className="card-title" style={{ fontSize: "10px" }}>
                {data.title}
              </h6>
              <p
                className="card-text text-body-secondary"
                style={{ fontSize: "10px", color: "grey"}}
              >
                {data.artist}
              </p>
              {/* <small>{data.mix ? <p>{data.mix}</p> : null}</small> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
