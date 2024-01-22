// 初始化图表
var pieChart = echarts.init(document.getElementById('pie-chart'));
var lineChart = echarts.init(document.getElementById('line-chart'));

// 饼图初始选项
var pieOption = {
    title: {
        text: '资产分布',
        left: 'center'
    },
    series: [
        {
            type: 'pie',
            radius: '50%',
            data: []
        }
    ],
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
};

// 折线图初始选项
var lineOption = {
    title: {
        text: '总资产趋势',
        left: 'center'
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [],
        type: 'line'
    }],tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            return params.name + ': ' + params.value;
        },
        axisPointer: {
            animation: false
        }
    },
};

// 设置初始选项
pieChart.setOption(pieOption);
lineChart.setOption(lineOption);

// CSV字符串
var data = `时间,现金,股票,房产,工作,债券,基金,黄金,比特币
2023.1,100,200,300,400,500,600,700,800
2023.2,300,200,100,500,400,300,200,100
2023.3,200,300,100,90,80,70,60,50
2023.4,400,500,200,300,200,100,50,40
2023.5,300,400,500,600,700,800,900,1000
2023.6,1000,900,800,700,600,500,400,300
2023.7,700,800,900,1000,1100,1200,1300,1400
2023.8,1400,1300,1200,1100,1000,900,800,700
2023.9,700,800,900,1000,1100,1200,1300,1400
2023.10,1400,1300,1200,1100,1000,900,800,700
2023.11,700,800,900,1000,1100,1200,1300,1400
2023.12,1400,1300,1200,1100,1000,900,800,700
2024.1,700,800,900,1000,1100,1200,1300,1400
2024.2,1400,1300,1200,1100,1000,900,800,700
2024.3,700,800,900,1000,1100,1200,1300,1400`;



// 解析CSV数据
function parseData(data) {
    var lines = data.split('\n');
    var headers = lines[0].split(',');
    var parsedData = lines.slice(1).map(line => {
        var values = line.split(',');
        var row = {};
        headers.forEach((header, index) => {
            row[header] = values[index];
        });
        return row;
    });
    return parsedData;
}

var parsedData = parseData(data);
var curI = 0

// 生成tabs
var tabsDiv = document.getElementById('tabs');
parsedData.forEach((data, index) => {
    var button = document.createElement('button');
    button.onclick = () => selectMonth(index);
    button.textContent = data.时间;
    tabsDiv.appendChild(button);
});
var timeList = parsedData.map(data => data.时间);
console.log(timeList);

// 更新图表数据
function selectMonth(index) {
    // var sList getSelectedAttributes()

    var data = parsedData[index];
    var pieData = [];
    var lineData = [];
    var totalNames = Object.keys(data).filter(name => name !== '时间');

    

    totalNames.forEach(name => {
        pieData.push({value: +data[name], name: name});
    });

    parsedData.forEach(data => {
        var total = 0;
        totalNames.forEach(name => {
            total += data[name];
        });
        lineData.push({month: data.时间, total: total});
    });

    pieOption.series[0].data = pieData;
    lineOption.series[0].data = lineData.map(data => data.total);
    lineOption.xAxis.data = lineData.map(data => data.month);

    pieChart.setOption(pieOption);
    lineChart.setOption(lineOption);
    curI = index;
}

// 默认选择第一个月份
selectMonth(curI);



var attributeList = timeList

        var checkboxContainer = document.getElementById("checkboxContainer");

        for (var i = 0; i < attributeList.length; i++) {
            var checkboxDiv = document.createElement("div");
            checkboxDiv.className = "form-check form-check-inline";

            var checkbox = document.createElement("input");
            checkbox.className = "form-check-input";
            checkbox.type = "checkbox";
            checkbox.id = "attr" + (i + 1);
            checkbox.value = attributeList[i];

            var label = document.createElement("label");
            label.className = "form-check-label";
            label.htmlFor = "attr" + (i + 1);
            label.appendChild(document.createTextNode(attributeList[i]));

            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(label);

            checkboxContainer.appendChild(checkboxDiv);
        }

        function selectAllAttributes() {
            var checkboxes = document.querySelectorAll('.form-check-input');
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        }

        function deselectAllAttributes() {
            var checkboxes = document.querySelectorAll('.form-check-input');
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
        }

        function getSelectedAttributes() {
            var selectedAttributes = [];

            for (var i = 0; i < attributeList.length; i++) {
                var checkbox = document.getElementById("attr" + (i + 1));
                if (checkbox.checked) {
                    selectedAttributes.push(checkbox.value);
                }
            }

            console.log("选中的属性：" + selectedAttributes);
        }
        // 获取所有class为"form-check-input"的复选框
        var checkboxes = document.querySelectorAll('.form-check-input');

        // 添加事件监听器，当复选框状态改变时触发
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                // 检查复选框是否被选中
                if (checkbox.checked) {
                    // 执行你想要的行为
                    console.log('复选框被选中了：', checkbox.value);
                    selectMonth(curI);
                    // 可以在这里添加更多的代码来实现其他行为
                } else {
                    // 复选框未被选中时的行为
                    console.log('复选框未被选中：', checkbox.value);
                    selectMonth(curI);
                }
            });
        });