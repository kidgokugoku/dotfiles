return {
  {
    "neovim/nvim-lspconfig",
    ---@class PluginLspOpts
    opts = {
      ---@type lspconfig.options
      servers = {
        -- pyright will be automatically installed with mason and loaded with lspconfig
        ruff = {},
      },
    },
  },
  -- require("lspconfig").ruff.setup({
  --   init_options = {
  --     settings = {
  --       -- Ruff language server settings go here
  --     },
  --   },
  -- }),
}
