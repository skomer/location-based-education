var iconImage = {
  getIconImageUrl: function(){
    var iconImageUrl = localStorage.iconImage;
    if(!iconImageUrl){
      iconImageUrl = "/images/anchor.png";
    }
    return iconImageUrl;
  },
  setIconImageUrl: function(iconImageUrl){
    localStorage.iconImage = iconImageUrl;
  }
}

module.exports = iconImage;