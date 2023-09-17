export async function getDoc (id) {
   

      
    // Create an anchor element
    const a = document.createElement('a');
    a.href = "/pdf/?id="+id // Specify the file name
    a.style.display = 'none'; // Hide the anchor element
    a.target = "_blank"
    // Append the anchor to the document
    document.body.appendChild(a);
    
    // Simulate a click on the anchor to trigger the download
    a.click();
    
    // Remove the anchor element
    document.body.removeChild(a);
    
    // Revoke the URL to clean up resources

  }
  