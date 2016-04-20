Ext.define('InboxManagement.view.dashboard.BottomDashboard', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.chart.theme.Muted',
        'InboxManagement.store.DashboardSent',
        'InboxManagement.store.DashboardInbox'
    ],
    xtype: 'bottom_dashboard',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 10,
    defaults: {
        frame: true,
        bodyPadding: 10
    },
    initComponent: function() {
        var chartSent = Ext.create('Ext.Panel', {
            width: '50%',
            items: [{
                    xtype: 'cartesian',
                    flipXY: true,
                    reference: 'chart',
                    width: '100%',
                    height: 420,
                    insetPadding: '40 40 30 40',
                    innerPadding: '3 0 0 0',
                    theme: {
                        type: 'muted'
                    },
                    store: {
                        type: 'dashboardsent'
                    },
                    animation: {
                        easing: 'easeOut',
                        duration: 500
                    },
                    interactions: ['itemhighlight'],
                    axes: [{
                            type: 'numeric3d',
                            position: 'bottom',
                            fields: 'total',
                            maximum: 40,
                            majorTickSteps: 10,
                            renderer: 'onAxisLabelRender',
                            title: 'Total email sent',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(245, 245, 245, 1.0)'
                                },
                                even: {
                                    fillStyle: 'rgba(255, 255, 255, 1.0)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'left',
                            fields: 'fullName',
                            label: {
                                textAlign: 'right'
                            },
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'fullName',
                            yField: 'total',
                            style: {
                                minGapWidth: 10
                            },
                            highlight: true,
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRenderSent'
                            },
                            renderer: function(sprite, record, attr, dateex, store) {
                                return Ext.apply(attr, {
                                    fill: '#115fa6'
                                });
                            }
                        }],
                    sprites: [{
                            type: 'text',
                            text: 'Sent to users',
                            fontSize: 22,
                            width: 100,
                            height: 30,
                            x: 40,
                            y: 20
                        }]
                }]
        });

        var chartInbox = Ext.create('Ext.Panel', {
            width: '50%',
            items: [{
                    xtype: 'cartesian',
                    flipXY: true,
                    reference: 'chart',
                    width: '100%',
                    height: 420,
                    insetPadding: '40 40 30 40',
                    innerPadding: '3 0 0 0',
                    theme: {
                        type: 'muted'
                    },
                    store: {
                        type: 'dashboardinbox'
                    },
                    animation: {
                        easing: 'easeOut',
                        duration: 500
                    },
                    interactions: ['itemhighlight'],
                    axes: [{
                            type: 'numeric3d',
                            position: 'bottom',
                            fields: 'total',
                            maximum: 40,
                            majorTickSteps: 10,
                            renderer: 'onAxisLabelRender',
                            title: 'Total email received',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(245, 245, 245, 1.0)'
                                },
                                even: {
                                    fillStyle: 'rgba(255, 255, 255, 1.0)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'left',
                            fields: 'fullName',
                            label: {
                                textAlign: 'right'
                            },
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'fullName',
                            yField: 'total',
                            style: {
                                minGapWidth: 10
                            },
                            highlight: true,
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRenderInbox'
                            }
                        }],
                    sprites: [{
                            type: 'text',
                            text: 'Received from users',
                            fontSize: 22,
                            width: 100,
                            height: 30,
                            x: 40,
                            y: 20
                        }]
                }]
        });

        this.items = [
            {
                flex: 1,
                xtype: chartInbox
            }, {
                flex: 1,
                xtype: chartSent
            }
        ];

        this.callParent();
    }
});




