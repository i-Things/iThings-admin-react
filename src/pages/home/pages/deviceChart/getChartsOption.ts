import type { ChartsOptionData } from '../../data';

const getChartsOption = (data: ChartsOptionData[], color: string[]) => {
  return {
    grid: { top: 40, right: 32, bottom: 24, left: 60 },
    color: color,
    legend: {
      orient: 'vertical',
      right: 'right',
      formatter: function (name: any) {
        let total = 0;
        let target = 0;
        data.forEach((item) => {
          total += item.value;
          if (item.name === name) {
            target = item.value;
          }
        });
        return name + ' ' + ((target / total) * 100).toFixed(2) + '%';
      },
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: true,
        },
        data,
      },
    ],
  };
};

export default getChartsOption;
