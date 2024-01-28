function createChart(obj) {
  const colorSteps = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const primarySets = colorSteps.map((item) => getComputedStyle(document.querySelector('html')).getPropertyValue(`--primary-color-${item}`));
  const secondarySets = colorSteps.map((item) => getComputedStyle(document.querySelector('html')).getPropertyValue(`--secondary-color-${item}`));
  const graySets = colorSteps.map((item) => getComputedStyle(document.querySelector('html')).getPropertyValue(`--gray-color-${item}`));

  let chartColors = [];

  switch (obj.colorType) {
    case 'primary':
      chartColors = primarySets;
      break;
    case 'secondary':
      chartColors = secondarySets;
      break;
    default:
      chartColors = primarySets;
      break;
  }

  function createBar(target, data, labels, _dataLabels) {
    !target.classList.contains('bar-chart') ? target.classList.add('bar-chart') : void 0;
    const labelPlugin = _dataLabels ? [ChartDataLabels] : null;
    const options = {
      type: 'bar',
      data: {
        datasets: [
          {
            data: data,
            borderWidth: 0,
            borderRadius: Number.MAX_VALUE,
            //barThickness: 20,
            //borderSkipped: false,
            maxBarThickness: 20,
            categoryPercentage: 0.3,
            backgroundColor: [chartColors[5], chartColors[3]],
          },
        ],
        labels: labels,
      },
      plugins: labelPlugin,
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: graySets[3],
            },
            ticks: {
              font: {
                size: 12,
              },
              color: graySets[5],
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
                weight: 600,
              },
              color: graySets[8],
              padding: 0,
            },
          },
        },
        plugins: {
          datalabels: {
            display: function (context) {
              return context.dataset.data[context.dataIndex];
            },
            font: {
              size: 12,
              weight: 500,
            },
            align: 'top',
            anchor: 'end',
            offset: -2,
            color: [chartColors[5], chartColors[3]],
          },
          legend: {
            display: false,
          },
          tooltip: {
            animation: false,
          }
        },
      },
    };
    const targetCanvas = document.createElement('canvas');
    targetCanvas.classList.add('bar');
    target.appendChild(targetCanvas);

    const chart = new Chart(targetCanvas, options);
  }

  function createMultiBar(target, data, labels, _legends, _legendsPosition, _legnedAlign, _dataLabels) {
    !target.classList.contains('bar-chart') ? target.classList.add('bar-chart') : void 0;
    const barWidth = 20 - data.length * labels.length * 0.2;
    const legenDisplay = Boolean(_legends) || false;
    const labelPlugin = _dataLabels ? [ChartDataLabels] : null;
    const cosDataSet = data.map((item, index) => {
      const colorIndex = 5 - index * 2;
      const legendValue = legenDisplay ? _legends[index] : null;
      if (_dataLabels) {
        return {
          label: legendValue,
          data: item,
          borderWidth: 0,
          borderRadius: Number.MAX_VALUE,
          //barPercentage: 0.5,
          //categoryPercentage: 1.5,
          barThickness: barWidth,
          maxBarThickness: 22,
          backgroundColor: chartColors[colorIndex],
          datalabels: {
            align: 'top',
            anchor: 'end',
            offset: -2,
            color: chartColors[colorIndex],
            display: function (context) {
              return context.dataset.data[context.dataIndex];
            },
            font: {
              size: 12,
              weight: 500,
            },
          },
        };
      } else {
        return {
          label: legendValue,
          data: item,
          borderWidth: 0,
          borderRadius: Number.MAX_VALUE,
          barThickness: barWidth,
          backgroundColor: chartColors[colorIndex],
        };
      }
    });
    const options = {
      type: 'bar',
      data: {
        datasets: cosDataSet,
        labels: labels,
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: graySets[3],
            },
            ticks: {
              font: {
                size: 12,
              },
              color: graySets[5],
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
                weight: 600,
              },
              color: graySets[8],
              padding: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: legenDisplay,
            position: _legendsPosition,
            align: _legnedAlign,
            labels: {
              font: {
                size: 13,
              },
              boxWidth: 8,
              boxHeight: 8,
              useBorderRadius: true,
              borderRadius: 4,
            },
          },
          tooltip: {
            animation: false,
          }
        },
      },
      plugins: labelPlugin,
    };

    const targetCanvas = document.createElement('canvas');
    targetCanvas.classList.add('multi-bar');
    target.appendChild(targetCanvas);

    const chart = new Chart(targetCanvas, options);
  }

  function createHorBar(target, data, labels) {
    !target.classList.contains('bar-chart') ? target.classList.add('bar-chart') : void 0;
    const options = {
      type: 'bar',
      data: {
        datasets: [
          {
            data: data,
            borderWidth: 0,
            borderRadius: Number.MAX_VALUE,
            categoryPercentage: 1,
            backgroundColor: [chartColors[6], chartColors[5], chartColors[4], chartColors[3], chartColors[2]],
          },
        ],
        labels: labels,
      },
      plugins: [ChartDataLabels],
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            display: false,
          },
          x: {
            display: false,
          },
        },
        plugins: {
          datalabels: {
            align: 'left',
            anchor: 'end',
            offset: 2,
            color: ['#fff', '#fff', '#fff', chartColors[6], chartColors[6]],
            formatter: function (value, context) {
              return `${context.chart.data.labels[context.dataIndex]}  ${value}`;
            },
            font: {
              size: 12,
              weight: 500,
              lineHeight: 1,
            },
          },
          legend: {
            display: false,
          },
          tooltip: {
            animation: false,
          }
        },
      },
    };
    const targetCanvas = document.createElement('canvas');
    targetCanvas.classList.add('hor-bar');
    target.appendChild(targetCanvas);

    const chart = new Chart(targetCanvas, options);
  }

  function createPie(target, data, labels, _dataLabels, _legendsDisplay, _legendsAlign, _legendsValueDisplay) {
    !target.classList.contains('pie-chart') ? target.classList.add('pie-chart') : void 0;
    const totalValue = data.reduce((acc, cur) => acc + cur, 0);
    const labelPlugin = _dataLabels ? [ChartDataLabels] : null;

    const options = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: data,
            borderWidth: 0,
            backgroundColor: [chartColors[6], chartColors[5], chartColors[4], chartColors[3], chartColors[2], chartColors[1], chartColors[0]],
          },
        ],
        labels: labels,
      },
      plugins: labelPlugin,
      options: {
        maintainAspectRatio: true,
        cutout: '25%',
        plugins: {
          datalabels: {
            align: 'center',
            anchor: 'center',
            offset: 0,
            color: ['#fff', '#fff', '#fff', '#fff', chartColors[5], chartColors[6], chartColors[7]],
            formatter: function (value, _) {
              return `${Math.round((value / totalValue) * 100)}%`;
            },
            font: {
              size: 14,
              weight: 500,
              lineHeight: 1,
            },
          },
          legend: {
            display: false,
          },
          tooltip: {
            animation: false,
          }
        },
      },
    };

    const targetWrap = document.createElement('div');
    targetWrap.classList.add('pie-wrapper');
    target.appendChild(targetWrap);

    const targetCanvas = document.createElement('canvas');
    targetCanvas.classList.add('pie');
    targetWrap.appendChild(targetCanvas);

    if (_legendsDisplay) {
      const legendWrap = document.createElement('ul');
      legendWrap.classList.add('legend-wrap');
      legendWrap.classList.add(obj.colorType);
      targetWrap.appendChild(legendWrap);
      _legendsAlign ? target.classList.add(_legendsAlign) : void 0;
      labels.forEach((item, index) => {
        const list = document.createElement('li');
        list.classList.add('item');
        legendWrap.appendChild(list);
        list.innerText = _legendsValueDisplay ? `${item}(${data[index]})` : `${item}`;
      });
    }
    const chart = new Chart(targetCanvas, options);
  }

  function createDonut(target, data) {
    !target.classList.contains('donut-chart') ? target.classList.add('donut-chart') : void 0;
    target.innerHTML = `
      <canvas class="donut"></canvas>
      <h6 class="preview-textfield"></h6>
    `;

    const options = {
      angle: 0.5,
      lineWidth: 0.12,
      radiusScale: 1,
      pointer: {
        length: 0,
        strokeWidth: 0.0,
        color: '#000000',
      },
      limitMax: false,
      limitMin: false,
      colorStart: chartColors[5],
      colorStop: chartColors[5],
      strokeColor: graySets[3],
      shadowColor: graySets[3],
      generateGradient: true,
      highDpiSupport: true,
    };

    let targetCanvas;
    let targetText;

    target.childNodes.forEach((item) => {
      if (item.nodeName === 'CANVAS') {
        targetCanvas = item;
      } else if (item.nodeName === 'H6') {
        targetText = item;
      }
    });
    const donutChart = new Donut(targetCanvas).setOptions(options);
    donutChart.setTextField(targetText);
    donutChart.maxValue = 100;
    donutChart.setMinValue(0);
    donutChart.animationSpeed = 23;
    donutChart.set(data);
  }

  function createLine(target, data, labels) {
    !target.classList.contains('line-chart') ? target.classList.add('line-chart') : void 0;
    //const labelPlugin = _dataLabels ? [ChartDataLabels] : null;

    const targetCanvas = document.createElement('canvas');
    targetCanvas.classList.add('line');
    target.appendChild(targetCanvas);
    const ctx = targetCanvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);

    const opcityColors = [0.6, 0.3, 0.1].map(item => {
      const baseColor = chartColors[5];
      const r = parseInt(baseColor.slice(2, 4), 16);
      const g = parseInt(baseColor.slice(4, 6), 16);
      const b = parseInt(baseColor.slice(6, 8), 16);
      return `rgba(${r}, ${g}, ${b}, ${item})`;
    });

    gradient.addColorStop(0, opcityColors[0]);
    gradient.addColorStop(0.4, opcityColors[1]);
    gradient.addColorStop(0.8, opcityColors[2]);

    const options = {
      type: 'line',
      data: {
        datasets: [
          {
            data: data,
            borderWidth: 2,
            borderColor: chartColors[6],
            fill: true,
            backgroundColor: gradient,
            tension: 0.3,
          },
        ],
        labels: labels,
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: graySets[3],
            },
            ticks: {
              font: {
                size: 12,
              },
              color: graySets[5],
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
                weight: 600,
              },
              color: graySets[8],
              padding: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          filler: {
            propagate: false,
          },
          tooltip: {
            animation: false,
          }
        },
      },
    };

    const chart = new Chart(targetCanvas, options);
  }

  switch (obj.type) {
    case 'bar':
      createBar(obj.target, obj.data, obj.labels, obj.dataLabels);
      break;
    case 'multiBar':
      createMultiBar(obj.target, obj.data, obj.labels, obj.legends, obj.legendsPosition, obj.legendsAlign, obj.dataLabels);
      break;
    case 'horBar':
      createHorBar(obj.target, obj.data, obj.labels);
      break;
    case 'pie':
      createPie(obj.target, obj.data, obj.labels, obj.dataLabels, obj.legendsDisplay, obj.legendsAlign, obj.legendsValueDisplay);
      break;
    case 'donut':
      createDonut(obj.target, obj.data);
      break;
    case 'line':
      createLine(obj.target, obj.data, obj.labels);
      break;
    default:
      break;
  }
}
