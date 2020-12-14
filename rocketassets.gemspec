lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'rocket_assets'
require 'rocket_assets/base_assets/version'

Gem::Specification.new do |s|
  s.name     = 'rocketassets'
  s.version  = RocketAssets::VERSION
  s.authors  = ['Octobat SAS']
  s.email    = 'gaultier@octobat.com'
  s.summary  = 'Base style assets for Rocket Apps'
  #s.homepage = 'https://github.com/twbs/bootstrap-rubygem'
  s.license  = 'MIT'

  s.add_runtime_dependency 'sass-rails', '>= 6'
  s.add_runtime_dependency 'autoprefixer-rails', '>= 6.0.3'

  s.files      = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- test/*`.split("\n")
end
