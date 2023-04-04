export const getOwls = async (owlData) => {
    if (owlData && owlData.length > 0){
        return owlData;
    }
    let result = fetch("https://api.inaturalist.org/v1/observations?captive=false&geo=true&licensed=true&photo_licensed=true&license=cc-by%2Ccc-by-nc%2Ccc-by-sa%2Ccc-by-nc-sa%2Ccc0&photo_license=cc-by%2Ccc-by-nc%2Ccc-by-sa%2Ccc-by-nc-sa%2Ccc0&place_id=12871&taxon_id=19350&&year=2023%2C2022&order=desc&order_by=created_at")
    .then((response) => response.json())
    .then((data) => {
        if(import.meta.env.VITE_DEBUG){
            console.log("getting owls")
            console.log(data);
        }
        return data.results;
    }).catch((err) =>{
        if(import.meta.env.VITE_DEBUG){
            console.log(err.message);
        } 
        return [];
    })
    return result;
}