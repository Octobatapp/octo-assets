require 'autoprefixer-rails'

module RocketAssets
  module BaseAssets
    module Rails
      class Engine < ::Rails::Engine
        initializer 'rocketassets.base_assets' do |app|
          app.config.assets.paths << root.join('core').to_s
        end
      end
    end
  end
end
