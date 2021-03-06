// Michael Osgood / Web Scraping Application

  // Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropriate information on the page
    $("#articles").append(
      "<div class='panel panel-default'><div class='panel-heading'>"
      +"<p data-id='" + data[i]._id + "'>"
      +data[i].headline+"</p></div><div class='panel-body'><p>"
      +data[i].summary +"</p><br>"
      +"<a class='btn btn-info save'>Save Article</a><br><br>"
      +"<a target='_blank' href='" + data[i].url + "' class='btn btn-info view'>"
      +"Go to Article</a><br><br>"
      +"<a data-id='" + data[i]._id + "' class='btn btn-info' data-toggle='modal' "
      +"data-target='#exampleModal'>Add Note</a><br><br>"
      +"<hr></div><div id='notes'></div></div>");
    }
});
  
  // Whenever someone clicks an 'Add Note' button
  $(document).on("click", "a", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .done(function(data) {
        console.log(data);
        
        $("#notes").append("<div class='notes-container'>"
        +"<div class='panel panel-default'><div class='panel-heading'><h7>" 
        + data.headline + "</h7></div><input id='titleinput' name='title' >"
        +"<textarea id='bodyinput' name='body'>"
        +"</textarea><button class='btn btn-info' data-id='" 
        + data._id + "' id='savenote'>Save Note</button></div></div></div>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  