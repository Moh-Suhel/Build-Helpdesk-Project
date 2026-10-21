import  Router from "express"
import {registerUser,
    loginUser
} from "../controllers/user.controllers.js"
import {ticketUser} from "../controllers/ticket.controller.js"
import {getMyTickets} from "../controllers/myTicket.controller.js"
import { VerifyUser } from "../middlewares/auth.middleware.js"
import {getTicketById} from "../controllers/ticketId.controller.js"
import { Update } from "../controllers/update.controller.js"
import { DeleteTicket } from "../controllers/delete.controller.js";
import { CreateComment } from "../controllers/comment.controller.js";
import { GetComments } from "../controllers/comment.controller.js"
import {  VerifyAdmin, } from "../middlewares/auth.middleware.js"
import {  GetAllTickets } from "../controllers/admin.controller.js"
import { GetAnyTicket } from "../controllers/admin.controller.js"
import { logoutUser } from "../controllers/user.controllers.js"
import { getCurrentUser } from "../controllers/user.controllers.js"
import { UpdateTicketStatus } from "../controllers/admin.controller.js"
import { UpdateTicketPriority } from "../controllers/admin.controller.js"
import { AssignTicket } from "../controllers/admin.controller.js"
import { GetAllUsers } from "../controllers/admin.controller.js"
import { SearchAndFilterTickets } from  "../controllers/admin.controller.js"
 

const router = Router()

router.route("/register").post(
    registerUser
)

router.route("/login").post(loginUser)
router.route("/ticket").post(VerifyUser , ticketUser) 
router.route("/myticket").get(VerifyUser, getMyTickets)
router.route("/ticket/:ticketId").get(VerifyUser, getTicketById)
router.route("/ticket/:ticketId").patch( VerifyUser, Update)
router.route("/ticket/:ticketId").delete(VerifyUser, DeleteTicket)
router.route("/ticket/:ticketId/comment").post(VerifyUser, CreateComment);
router.route("/ticket/:ticketId/comment").get(VerifyUser,GetComments);
router.route("/admin/tickets").get(VerifyUser,VerifyAdmin,GetAllTickets);

router.route("/logout").post(VerifyUser, logoutUser);
router.route("/current-user").get( VerifyUser,getCurrentUser);
router.route("/admin/tickets/:ticketId/status").patch(VerifyUser,VerifyAdmin,UpdateTicketStatus);
router.route("/admin/tickets/:ticketId/priority").patch(VerifyUser,VerifyAdmin,UpdateTicketPriority);
router.route("/admin/tickets/:ticketId/assign").patch(
    VerifyUser,
    VerifyAdmin,
    AssignTicket
);
router.route("/admin/users").get(
    VerifyUser,
    VerifyAdmin,
    GetAllUsers
);
router.route("/admin/tickets/filter").get(
    VerifyUser,
    VerifyAdmin,
    SearchAndFilterTickets
);
router.route("/admin/tickets/:ticketId").get(VerifyUser,VerifyAdmin,GetAnyTicket);
export {router}