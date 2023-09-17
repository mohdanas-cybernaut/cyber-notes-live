export function groupByField(documents, field) {
    const groupedData = {};
  
    for (const document of documents) {
      const fieldValue = document[field];
  
      // Create an array for the field value if it doesn't exist
      if (!groupedData[fieldValue]) {
        groupedData[fieldValue] = [];
      }
  
      // Push the document into the corresponding array
      groupedData[fieldValue].push(document);
    }
  
    return groupedData
  }