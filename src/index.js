import server from "#configs/server";
import env from "#configs/env";

server.listen(env.PORT, () => {
  console.log(`Server started on PORT ${env.PORT}`);
});
