export class DynamicQueries {
  async serarch(searchFields: string[], searchTerm: string) {
    const regx = new RegExp(`.*${searchTerm}*.`, `i`);
    const orArray: Array<object> = [];
    searchFields.forEach((field) => {
      orArray.push({
        [field]: regx,
      });
    });

    return orArray;
  }

  async filter(
    NumberFields: Array<object>,
    stringFields: Array<object>,
    DateFields: Array<object>
  ) {
    const andArray: Array<object> = [];

    NumberFields.forEach(function (field: { [key: string]: any }) {
      Object.keys(field).forEach((key) => {
        andArray.push({
          [key]: {
            $gte: field[key][0],
            $lte: field[key][1],
          },
        });
      });
    });

    stringFields.forEach(function (obj: { [key: string]: any }) {
      Object.keys(obj).forEach(function (key) {
        const value = obj[key];
        andArray.push({
          [key]: value,
        });
      });
    });




    DateFields.forEach(function (field: { [key: string]: any }) {
        Object.keys(field).forEach((key) => {
            let startDate = new Date(`${field[key][0]}T00:00:00Z`);
            let endDate = new Date(`${field[key][1]}T23:59:59Z`);
    
            let filter : { [key: string]: any }= {};
            filter[key] = {
                '$gte': startDate,
                '$lte': endDate
            };
    
            andArray.push(filter);
        });
    });


    return andArray;
  }
}
