import { getImageUrl } from './Utils';

export const DesignCards = (imgData) => (imgData.images.map((image, index) => {
    const { name, thumbnail, id } = image;
    const imageUrl = getImageUrl(id, thumbnail);
    return (
      <div key={index} className="card">
        <div className="card-body ">
          <img
            alt={name}
            data-src={imageUrl}
            className="card-img-top"
          />
        </div>
        <div className="card-footer">
          <div className="card-name">{name}</div>
        </div>
      </div>
    );
  }));