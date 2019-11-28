(function(){
  // If on someone's Github profile
  const activityContainer = document.querySelector('.graph-before-activity-overview')
  if(activityContainer)
    initColorize()
})()

function initColorize()
{
  chrome.storage.local.get('color', function(data) {
    if(!data.color)
      data.color = '4594A8'
    let mainColorHex = `#${data.color}`

    const legendItems = document.querySelectorAll('.contrib-legend ul li')
    const originalColors = []
    for(let li of legendItems)
      originalColors.push(li.getAttribute('style').split(':')[1].trim())

    colorizeActivity(mainColorHex)
    colorizeLegend(mainColorHex, originalColors, legendItems)
    colorizeDays(mainColorHex, originalColors)
  });
}

function colorizeActivity(color)
{
  const activity = document.querySelector('.js-highlight-blob')
  if(activity)
  {
    const axes = document.querySelectorAll('.activity-overview-axis')
    const ellipses = document.querySelectorAll('.activity-overview-point')
    const blob = document.querySelector('.js-highlight-blob')
    activity.setAttribute('stroke', color)
    blob.style.fill = color
    for(let ellipse of ellipses)
      ellipse.style.stroke = color
    for(let axis of axes)
      axis.style.stroke = color
  }
}

function colorizeLegend(mainColor, originalColors, legendItems)
{
  legendItems[0].setAttribute('style', `background-color:${originalColors[0]}`)
  legendItems[1].setAttribute('style', `background-color:${colorLuminance(mainColor, 0.9)}`)
  legendItems[2].setAttribute('style', `background-color:${colorLuminance(mainColor, 0.75)}`)
  legendItems[3].setAttribute('style', `background-color:${colorLuminance(mainColor, 0.5)}`)
  legendItems[4].setAttribute('style', `background-color:${mainColor}`)
}

function colorizeDays(mainColor, originalColors)
{
  let days = Array.from(document.getElementsByClassName('day'))

  const dayGroups = {
    0: days.filter( day => day.getAttribute('fill') == originalColors[0]),
    1: days.filter( day => day.getAttribute('fill') == originalColors[1]),
    2: days.filter( day => day.getAttribute('fill') == originalColors[2]),
    3: days.filter( day => day.getAttribute('fill') == originalColors[3]),
    4: days.filter( day => day.getAttribute('fill') == originalColors[4])
  }

  dayGroups[0].forEach(day => day.setAttribute('fill', originalColors[0]))
  dayGroups[1].forEach(day => day.setAttribute('fill', colorLuminance(mainColor, 0.9)))
  dayGroups[2].forEach(day => day.setAttribute('fill', colorLuminance(mainColor, 0.75)))
  dayGroups[3].forEach(day => day.setAttribute('fill', colorLuminance(mainColor, 0.5)))
  dayGroups[4].forEach(day => day.setAttribute('fill', mainColor))
}

function colorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }
  return rgb;
}
