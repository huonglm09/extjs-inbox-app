Ext.define('InboxManagement.view.dashboard.Dashboard', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.layout.container.VBox',
        'InboxManagement.view.dashboard.DashboardController',
        'InboxManagement.view.dashboard.DashboardModel',
        'InboxManagement.store.Dashboard',
        'InboxManagement.view.dashboard.BottomDashboard'
    ],
    xtype: 'dashboard',
    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
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
                        type : 'dashboard'
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
                            angleField: 'value',
                            donut: 50,
                            label: {
                                field: 'name',
                                display: 'outside'
                            },
                            highlight: true,
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onCompareSeriesTooltipRender'
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
                xtype: 'bottom_dashboard'
            }
        ];

        this.callParent();
    }
});




