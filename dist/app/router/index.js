"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_auth_1 = require("../modules/auth/route.auth");
const route_summery_1 = require("../modules/summery/route.summery");
const route_admin_1 = require("../modules/admin/route.admin");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: '/summaries',
        route: route_summery_1.SummaryRoutes,
    },
    {
        path: '/auth',
        route: route_auth_1.userRoute,
    },
    {
        path: '/admin',
        route: route_admin_1.AdminRoutes,
    },
];
moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));
exports.default = router;
