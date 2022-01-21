const TankTile = ({name, imgSrc}) => {
    return ( 
        <div className="tank-tile bg-neutral-800 px-10">
            <img src={imgSrc} alt="tank" />
            {name}
        </div>
     );
}
 
export default TankTile;