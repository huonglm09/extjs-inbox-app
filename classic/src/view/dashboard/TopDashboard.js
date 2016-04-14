Ext.define('InboxManagement.view.dashboard.TopDashboard', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.chart.theme.Muted'
    ],
    xtype: 'top_dashboard',
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
                        fields: ['country', 'agr', 'ind', 'ser'],
                        data: [
                            {country: 'USA', agr: 188217, ind: 2995787, ser: 12500746},
                            {country: 'China', agr: 918138, ind: 3611671, ser: 3792665},
                            {country: 'Japan', agr: 71568, ind: 1640091, ser: 4258274},
                            {country: 'UK', agr: 17084, ind: 512506, ser: 1910915},
                            {country: 'Russia', agr: 78856, ind: 727906, ser: 1215198}
                        ]
                    },
                    animation: {
                        easing: 'easeOut',
                        duration: 500
                    },
                    interactions: ['itemhighlight'],
                    axes: [{
                            type: 'numeric3d',
                            position: 'bottom',
                            fields: 'ind',
                            maximum: 4000000,
                            majorTickSteps: 10,
                            renderer: 'onAxisLabelRender',
                            title: 'Billions of USD',
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
                            fields: 'country',
                            label: {
                                textAlign: 'right'
                            },
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'ind',
                            style: {
                                minGapWidth: 10
                            },
                            highlight: true,
                            label: {
                                field: 'ind',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            },
                            renderer: function(sprite, record, attr, index, store) {
                                return Ext.apply(attr, {
                                    fill: '#35baf6'
                                });
                            }
                        }],
                    sprites: [{
                            type: 'text',
                            text: 'Received',
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
                        fields: ['country', 'agr', 'ind', 'ser'],
                        data: [
                            {country: 'USA', agr: 188217, ind: 2995787, ser: 12500746},
                            {country: 'China', agr: 918138, ind: 3611671, ser: 3792665},
                            {country: 'Japan', agr: 71568, ind: 1640091, ser: 4258274},
                            {country: 'UK', agr: 17084, ind: 512506, ser: 1910915},
                            {country: 'Russia', agr: 78856, ind: 727906, ser: 1215198}
                        ]
                    },
                    animation: {
                        easing: 'easeOut',
                        duration: 500
                    },
                    interactions: ['itemhighlight'],
                    axes: [{
                            type: 'numeric3d',
                            position: 'bottom',
                            fields: 'ind',
                            maximum: 4000000,
                            majorTickSteps: 10,
                            renderer: 'onAxisLabelRender',
                            title: 'Billions of USD',
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
                            fields: 'country',
                            label: {
                                textAlign: 'right'
                            },
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'ind',
                            style: {
                                minGapWidth: 10
                            },
                            highlight: true,
                            label: {
                                field: 'ind',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }],
                    sprites: [{
                            type: 'text',
                            text: 'Sent',
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
                title: {
                    bind: {
                        html: '<i class="mark-color"></i><div class="title-panel">Profile</div>'
                    }
                },
                flex: 1,
                margin: '0 30 0 0',
                xtype: chartInbox
            }, {
                title: {
                    bind: {
                        html: '<i class="mark-color"></i><div class="title-panel">Profile</div>'
                    }
                },
                flex: 1,
                xtype: chartSent
            }
        ];

        this.callParent();
    }
});




