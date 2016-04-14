Ext.define('InboxManagement.view.dashboard.Dashboard', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.layout.container.VBox',
        'InboxManagement.view.dashboard.DashboardController',
        'InboxManagement.view.dashboard.DashboardModel',
        'InboxManagement.store.Dashboard',
        'InboxManagement.view.dashboard.TopDashboard'
    ],
    xtype: 'dashboard',
    controller: 'dashboard',
    viewModel: {
        type: 'profile'
    },
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 10,
    defaults: {
        frame: true,
        bodyPadding: 10,
        height: 400
    },
    initComponent: function() {
        var chart = Ext.create('Ext.Panel', {
            items: [{
                    xtype: 'polar',
                    reference: 'chart',
                    width: '50%',
                    height: 420,
                    margin: '0 0 50 0',
                    insetPadding: 50,
                    innerPadding: 20,
                    store: {
                        fields: ['os', 'data1'],
                        data: [
                            {os: 'Android', data1: 68.3},
                            {os: 'BlackBerry', data1: 1.7},
                            {os: 'iOS', data1: 17.9},
                            {os: 'Windows Phone', data1: 10.2},
                            {os: 'Others', data1: 1.9}
                        ]
                    },
                    legend: {
                        docked: 'bottom'
                    },
                    interactions: ['rotate', 'itemhighlight'],
                    sprites: [{
                            type: 'text',
                            text: 'Email: Sent - Received',
                            fontSize: 22,
                            width: 100,
                            height: 30,
                            x: 40,
                            y: 20
                        }, {
                            type: 'text',
                            text: 'Data: IDC Predictions - 2017',
                            x: 12,
                            y: 425
                        }, {
                            type: 'text',
                            text: 'Source: Internet',
                            x: 12,
                            y: 440
                        }],
                    series: [{
                            type: 'pie3d',
                            angleField: 'data1',
                            donut: 50,
                            label: {
                                field: 'os',
                                display: 'outside'
                            },
                            highlight: true,
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }]
                }]
        });

        this.items = [
            {
                margin: '0 0 30 0',
                xtype: chart
            }, {
                cls: 'border-zero',
                bodyPadding: 0,
                border: false,
                xtype: 'top_dashboard'
            }
        ];

        this.callParent();
    }
});




