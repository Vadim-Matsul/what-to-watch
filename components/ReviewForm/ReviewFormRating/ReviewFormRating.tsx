

export const ReviewFormRating: React.FC = () => {
  const Rating = new Array(5).fill(null);

  return (
    <div className="rating">
      <div className="rating__stars">
        {Rating.map((r, i) => (
          <span key={i + 1}>
            <input className="rating__input" id={`star-${i + 1}`} type="radio" name="rating" value={i + 1} />
            <label className="rating__label" htmlFor={`star-${i + 1}`}>Rating {i + 1}</label>
          </span>
        ))}
      </div>
    </div>

  )
}