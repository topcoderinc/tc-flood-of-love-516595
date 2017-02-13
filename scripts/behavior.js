function toggle_input(id){
  var element = $("div#" + id);
  var input = $("div#" + id + " > input")
  if(element.is(':visible')){
    element.hide();
    input.hide();
  }
  else{
    element.show();
    input.show().focus();
  }
}

function change_word(id){
  var new_word = $("input")[id].value;
  var new_text = $("div#text").text().replace("$" + id, new_word);
  $("div#text").text(new_text);
}

$(document).ready(function(){
  var num_words = $("input").length;
  for(var i = 0; i < num_words; i++){
    $("div#" + i).hide();
  }
  var current_word = 0;
  toggle_input(current_word);
  $("input").keypress(function(e){
    if(e.keyCode == 13 && $("input")[current_word].value != ""){
      toggle_input(current_word);
      change_word(current_word);
      if(current_word == num_words - 1){
        $("div#text").show();
      }
      else{
        current_word += 1;
        toggle_input(current_word);
      }
    }
  })
})
