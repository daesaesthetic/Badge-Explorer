import { Router, type IRouter } from "express";
import {
  ListBadgesQueryParams,
  GetBadgeParams,
  ListBadgesResponse,
  ListBadgeCategoriesResponse,
  GetBadgeStatsResponse,
  GetBadgeResponse,
} from "@workspace/api-zod";
import {
  searchBadges,
  getBadgeById,
  getCategories,
  getStats,
} from "../data/badges";

const router: IRouter = Router();

router.get("/badges", (req, res): void => {
  const parsed = ListBadgesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const badges = searchBadges(parsed.data);
  res.json(ListBadgesResponse.parse(badges));
});

router.get("/badges/stats", (_req, res): void => {
  const stats = getStats();
  res.json(GetBadgeStatsResponse.parse(stats));
});

router.get("/badges/categories", (_req, res): void => {
  const categories = getCategories();
  res.json(ListBadgeCategoriesResponse.parse(categories));
});

router.get("/badges/:id", (req, res): void => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetBadgeParams.safeParse({ id: raw });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const badge = getBadgeById(params.data.id);
  if (!badge) {
    res.status(404).json({ error: "Badge not found" });
    return;
  }

  res.json(GetBadgeResponse.parse(badge));
});

export default router;
