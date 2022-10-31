import * as axios from "axios";

async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return (
    data && console.log(data.features.map((feature) => feature.properties))
  );
}

export const boroughs = fetchData(
  "https://raw.githubusercontent.com/PhianaDv/data/main/boroughs.geojson?token=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"
);

export const data_url = fetchData(
  "https://data.cityofnewyork.us/resource/h9gi-nx95.geojson?$where=(crash_date%3E%222018-12-31%22%20and%20latitude%20is%20not%20null)"
); // eslint-disable-line

export const population_2020 = fetchData(
  "https://data.cityofnewyork.us/resource/xywu-7bv9.geojson?$select=borough,_2020,_2020_boro_share_of_nyc_total"
);

export const property_valuations = fetchData(
  "https://data.cityofnewyork.us/resource/yjxr-fw8i.geojson?$select=geocoded_column,boro,stories,fullval,staddr,latitude&$where=latitude%20is%20not%20null%20and%20fullval%3E0"
);
export const arrestData_2020to2021 = fetchData(
  "https://data.cityofnewyork.us/resource/8h9b-rp9u.geojson?$select=lon_lat,arrest_boro,age_group,perp_sex,law_cat_cd,pd_desc,arrest_date&$where=latitude%20is%20not%20null%20and%20arrest_date%3E%222019-12-31%22"
);

export const dropoutRates_2013_cohort = fetchData(
  "data.cityofnewyork.us/resource/ynqa-y42e.json?$select=borough,category,%20cohort_year,cohort,total_cohort,dropout_1&$where=cohort_year=2013"
);

export const data = [
  [-74.0331, 40.7378, 11],
  [-73.9991, 40.7236, 11],
  [-73.9991, 40.7357, 12],
  [-73.9768, 40.7553, 15],
  [-73.9768, 40.7627, 15],
  [-73.9767, 40.644, 1],
  [-73.9767, 40.6497, 1],
  [-73.9677, 40.7689, 15],
  [-73.9676, 40.5969, 1],
  [-73.9676, 40.6047, 1],
  [-73.9442, 40.708, 5]
];
