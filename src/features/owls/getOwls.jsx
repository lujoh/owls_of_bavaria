// Retrieve Owl data from iNaturalist
export const getOwls = async (owlData) => {
    if (owlData.status != "not loaded" && owlData.status != "reload" || owlData.owls.length == 0){
        return owlData;
    }
    let reached_end = false;
    let last_id = 0
    let results = []
    //retrieve all results in case there is more than one page worth
    while (!reached_end){
        let query_result = await runOwlQuery(last_id);
        if (!query_result || query_result.length == 0){
            reached_end = true;
            continue;
        }
        last_id = query_result.results[query_result.results.length - 1].id;
        let total_retrieved = query_result.per_page;
        let total_results = query_result.total_results;
        results.push(...query_result.results);
        if (total_retrieved >= total_results){
            reached_end = true;
        }
    }
    let formatted_results = formatOwlData(results);
    return formatted_results;
}

function formatOwlData(input){
    const output = {
        owls: {},
        taxaById: {},
        taxaList: []
    };
    for (const observation of input){
        output.owls[observation.id] = {
            id: observation.id,
            licence_code: observation.license_code,
            observation_date: observation.observed_on,
            obscured: observation.obscured,
            photo_attribution: observation.photos ?observation.photos[0].attribution : '',
            photo_url: observation.photos ? observation.photos[0].url : '',
            longitude: observation.geojson.coordinates[0],
            latitude: observation.geojson.coordinates[1],
            taxon_id: observation.taxon.id
        };
        if (observation.taxon.id in output.taxaById){
            output.taxaById[observation.taxon.id].count ++;
        } else {
            output.taxaById[observation.taxon.id] = {
                id: observation.taxon.id,
                species_name: observation.taxon.preferred_common_name,
                species_scientific: observation.taxon.name,
                count: 1,
                threatened: observation.taxon.threatened,
                native: observation.taxon.native
            };
            output.taxaList.push(observation.taxon.id);
        }
    }
    return output;
}

//function to retrieve the next 200 results from iNaturalist based on the last retrieved id
function runOwlQuery(last_id){
    let result = fetch("https://api.inaturalist.org/v1/observations?captive=false&geo=true&licensed=true&photo_licensed=true&license=cc-by%2Ccc-by-nc%2Ccc-by-sa%2Ccc-by-nc-sa%2Ccc0&photo_license=cc-by%2Ccc-by-nc%2Ccc-by-sa%2Ccc-by-nc-sa%2Ccc0&place_id=12871&id_above=" + encodeURIComponent(last_id) + "&taxon_id=19350&per_page=200&order=asc&order_by=id")
    .then((response) => response.json())
    .then((data) => {
        if(import.meta.env.VITE_DEBUG){
            console.log("getting owls")
            console.log(data);
        }
        return data;
    }).catch((err) =>{
        if(import.meta.env.VITE_DEBUG){
            console.log(err.message);
        } 
        return [];
    })
    return result;
}